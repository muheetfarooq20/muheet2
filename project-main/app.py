from flask import Flask, render_template, request, redirect, url_for, jsonify, session, g
from flask_cors import CORS
import os
import pandas as pd
import numpy as np
import json
import logging
import joblib
import datetime
from auth import auth
import time

# Set up logging
logging.basicConfig(level=logging.DEBUG, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                   handlers=[logging.StreamHandler()])

# Initialize Flask application with template and static folders
app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

# Secret key for sessions
app.secret_key = os.environ.get('SECRET_KEY', 'pridictx-dev-secret-key')
# Session will last for 7 days
app.permanent_session_lifetime = datetime.timedelta(days=7)

# Register blueprints
app.register_blueprint(auth)

# Set up cache control
@app.after_request
def add_header(response):
    """Add headers to prevent caching"""
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response
    
# Create uploads directory if it doesn't exist
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load ML models and data
try:
    model_path = os.path.join(UPLOAD_FOLDER, 'bug_detector_model.pkl')
    scaler_path = os.path.join(UPLOAD_FOLDER, 'bug_detector_scaler.pkl')
    features_path = os.path.join(UPLOAD_FOLDER, 'bug_detector_features.pkl')
    
    if os.path.exists(model_path) and os.path.exists(scaler_path) and os.path.exists(features_path):
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        feature_names = joblib.load(features_path)
        logging.info("Successfully loaded ML models")
    else:
        logging.warning("Model files not found. Prediction functionality will be limited.")
        model = None
        scaler = None
        feature_names = None
except Exception as e:
    logging.error(f"Error loading ML models: {e}")
    model = None
    scaler = None
    feature_names = None

# Context processor for accessing the current user in templates
@app.context_processor
def inject_user():
    """Inject current user into all templates"""
    user = {
        'is_authenticated': 'user_email' in session,
        'email': session.get('user_email', None),
        'name': session.get('user_name', None)
    }
    return {'user': user}

# Context processors for all templates
@app.context_processor
def utility_processor():
    return {
        'now': int(time.time()),  # Current timestamp to prevent caching
        'user': g.user if hasattr(g, 'user') else None
    }

# Add the timestamp context processor before the existing ones
app.context_processor(utility_processor)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def index_html():
    return redirect(url_for('index'))

@app.route('/analyzer')
def analyzer():
    # Create empty metrics to prevent template errors
    metrics = {
        'loc': 0,
        'v(g)': 0,
        'ev(g)': 0,
        'iv(g)': 0,
        'n': 0,
        'v': 0,
        'd': 0,
        'e': 0,
        'b': 0,
        't': 0,
        'mi': 0,
        'i': 0,
        'wi': 0
    }
    return render_template('analyzer.html', metrics=metrics)

@app.route('/analyzer.html')
def analyzer_html():
    return redirect(url_for('analyzer'))

@app.route('/predictor')
def predictor():
    # Create empty metrics to prevent template errors
    metrics = {
        'loc': 0,
        'v(g)': 0,
        'ev(g)': 0,
        'iv(g)': 0,
        'n': 0,
        'v': 0,
        'l': 0,
        'd': 0,
        'i': 0,
        'e': 0,
        'b': 0,
        't': 0,
        'lOCode': 0,
        'lOComment': 0, 
        'lOBlank': 0,
        'locCodeAndComment': 0,
        'uniq_Op': 0,
        'uniq_Opnd': 0,
        'total_Op': 0,
        'total_Opnd': 0,
        'branchCount': 0
    }
    return render_template('predictor.html', metrics=metrics)

@app.route('/predictor.html')
def predictor_html():
    return redirect(url_for('predictor'))

@app.route('/introduction')
def introduction():
    return render_template('introduction.html')

@app.route('/introduction.html')
def introduction_html():
    return redirect(url_for('introduction'))

@app.route('/features')
def features():
    return render_template('features.html')

@app.route('/features.html')
def features_html():
    return redirect(url_for('features'))

@app.route('/how-it-works')
def how_it_works():
    return render_template('how-it-works.html')

@app.route('/how-it-works.html')
def how_it_works_html():
    return redirect(url_for('how_it_works'))

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/team.html')
def team_html():
    return redirect(url_for('team'))

@app.route('/help')
def help():
    return render_template('help.html')

@app.route('/help.html')
def help_html():
    return redirect(url_for('help'))

@app.route('/start')
def start():
    return render_template('start.html')

@app.route('/start.html')
def start_html():
    return redirect(url_for('start'))

@app.route('/results')
def results():
    return render_template('results.html')

@app.route('/results.html')
def results_html():
    return redirect(url_for('results'))

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # File upload and processing logic would go here
        files = request.files.getlist('files')
        
        # Processing logic for uploaded files
        # This is a placeholder for the actual implementation
        
        return redirect(url_for('results'))
    return render_template('upload.html')

@app.route('/upload.html', methods=['GET'])
def upload_html():
    return redirect(url_for('upload'))

@app.route('/predict', methods=['POST'])
def predict():
    """Handle single prediction requests with advanced AI bug prediction"""
    try:
        input_data = request.get_json()
        logging.info(f"Received prediction request with data: {input_data}")
        
        # Create a DataFrame with the input data
        df = pd.DataFrame([input_data])
        logging.info(f"Created DataFrame with shape: {df.shape}")
        
        if model is not None and scaler is not None and feature_names is not None:
            logging.info("ML model, scaler, and features are available")
            try:
                # Extract features that our model knows about
                available_features = [f for f in feature_names if f in input_data]
                logging.info(f"Available features for prediction: {available_features}")
                
                if not available_features:
                    logging.warning("No matching features found between input and model")
                    return jsonify({'error': 'No matching features between input and model'}), 400
                
                # Prepare feature vector for prediction
                X = df[available_features].fillna(0)
                logging.info(f"Feature vector shape: {X.shape}")
                
                # Scale the features
                X_scaled = scaler.transform(X)
                logging.info(f"Scaled feature vector shape: {X_scaled.shape}")
                
                # Get prediction from model
                prediction_proba = model.predict_proba(X_scaled)[0]
                prediction = 1 if prediction_proba[1] > 0.5 else 0
                logging.info(f"Prediction: {prediction}, Probability: {prediction_proba[1]}")
                
                # Calculate feature importance for this prediction
                if hasattr(model, 'feature_importances_'):
                    # For tree-based models
                    importance_scores = model.feature_importances_
                    feature_importance = dict(zip(feature_names, importance_scores))
                    logging.info(f"Feature importance available: {list(feature_importance.items())[:3]}...")
                    
                    # Sort by importance and get top features
                    top_features = {k: {'influence': round(v, 2)} 
                                  for k, v in sorted(feature_importance.items(), 
                                                    key=lambda item: item[1], 
                                                    reverse=True)[:5]}
                else:
                    logging.info("No feature importance available, using default values")
                    # Fallback for non-tree models
                    top_features = {
                        'loc': {'influence': 0.8},
                        'v(g)': {'influence': 0.7},
                        'e': {'influence': 0.6},
                        'd': {'influence': 0.5},
                        'b': {'influence': 0.4}
                    }
                
                # Generate insights based on the prediction
                insights = generate_code_insights(input_data, prediction, top_features)
                logging.info(f"Generated {len(insights)} insights")
                
                response = {
                    'prediction': prediction,
                    'probability': round(float(prediction_proba[1]), 2),
                    'input': input_data,
                    'top_metrics': top_features,
                    'insights': insights,
                    'is_ai_prediction': True
                }
                
                logging.info("Returning AI prediction response")
                return jsonify(response)
                
            except Exception as e:
                logging.error(f"Error using model for prediction: {e}", exc_info=True)
                # Fall back to algorithmic approach if model fails
                logging.info("Falling back to algorithmic prediction")
                response = algorithmic_prediction(input_data)
                return jsonify(response)
        else:
            # If no model is available, use algorithmic approach
            logging.warning("ML model not available, using algorithmic approach")
            response = algorithmic_prediction(input_data)
            return jsonify(response)
        
    except Exception as e:
        logging.error(f"Error in predict endpoint: {e}", exc_info=True)
        return jsonify({'error': f'Error processing request: {str(e)}'}), 500

@app.route('/analyze_code', methods=['POST'])
def analyze_code():
    """Handle code file upload and extraction of metrics for prediction"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
            
        # Check file extension
        file_ext = file.filename.split('.')[-1].lower()
        if file_ext not in ['js', 'py', 'java', 'c', 'cpp', 'cs']:
            return jsonify({'error': 'Unsupported file type'}), 400
            
        # Save file to temp storage
        filename = f"code_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.{file_ext}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Extract metrics from code
        metrics = extract_code_metrics(filepath, file_ext)
        
        # Use the extracted metrics for prediction
        if metrics:
            # Create a DataFrame with the extracted metrics
            df = pd.DataFrame([metrics])
            
            if model is not None and scaler is not None and feature_names is not None:
                try:
                    # Extract features that our model knows about
                    available_features = [f for f in feature_names if f in metrics]
                    
                    # Prepare feature vector for prediction
                    X = df[available_features].fillna(0)
                    
                    # Scale the features
                    X_scaled = scaler.transform(X)
                    
                    # Get prediction from model
                    prediction_proba = model.predict_proba(X_scaled)[0]
                    prediction = 1 if prediction_proba[1] > 0.5 else 0
                    
                    # Calculate feature importance for this prediction
                    if hasattr(model, 'feature_importances_'):
                        # For tree-based models
                        importance_scores = model.feature_importances_
                        feature_importance = dict(zip(feature_names, importance_scores))
                        
                        # Sort by importance and get top features
                        top_features = {k: {'influence': round(v, 2)} 
                                      for k, v in sorted(feature_importance.items(), 
                                                        key=lambda item: item[1], 
                                                        reverse=True)[:5]}
                    else:
                        # Fallback for non-tree models
                        top_features = {
                            'loc': {'influence': 0.8},
                            'v(g)': {'influence': 0.7},
                            'e': {'influence': 0.6},
                            'd': {'influence': 0.5},
                            'b': {'influence': 0.4}
                        }
                    
                    # Generate insights based on the prediction
                    insights = generate_code_insights(metrics, prediction, top_features)
                    
                    return jsonify({
                        'metrics': metrics,
                        'prediction': prediction,
                        'probability': round(float(prediction_proba[1]), 2),
                        'top_metrics': top_features,
                        'insights': insights,
                        'is_ai_prediction': True
                    })
                except Exception as e:
                    logging.error(f"Error using model for code analysis prediction: {e}")
            
            # If model prediction fails or model isn't available, just return metrics
            return jsonify({
                'metrics': metrics
            })
        else:
            return jsonify({'error': 'Failed to extract metrics from code'}), 500
            
    except Exception as e:
        logging.error(f"Error in analyze_code endpoint: {e}")
        return jsonify({'error': f'Error processing request: {str(e)}'}), 500

def extract_code_metrics(filepath, file_ext):
    """Extract code metrics from file for prediction"""
    try:
        # Count lines of code
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            code_lines = f.readlines()
        
        # Basic metrics
        loc = len(code_lines)
        blank_lines = sum(1 for line in code_lines if line.strip() == '')
        comment_lines = 0
        
        # Count comment lines based on file type
        comment_markers = {
            'py': '#',
            'js': '//',
            'java': '//',
            'c': '//',
            'cpp': '//',
            'cs': '//'
        }
        
        # Multi-line comment markers
        multi_line_start = {
            'py': "'''",
            'js': '/*',
            'java': '/*',
            'c': '/*',
            'cpp': '/*',
            'cs': '/*'
        }
        
        multi_line_end = {
            'py': "'''",
            'js': '*/',
            'java': '*/',
            'c': '*/',
            'cpp': '*/',
            'cs': '*/'
        }
        
        # Count comment lines
        in_multi_line = False
        for line in code_lines:
            line = line.strip()
            
            # Check for multi-line comments
            if file_ext in multi_line_start and multi_line_start[file_ext] in line:
                if file_ext in multi_line_end and multi_line_end[file_ext] in line[line.find(multi_line_start[file_ext]) + len(multi_line_start[file_ext]):]:
                    comment_lines += 1
                else:
                    in_multi_line = True
                    comment_lines += 1
            elif file_ext in multi_line_end and in_multi_line:
                if multi_line_end[file_ext] in line:
                    in_multi_line = False
                comment_lines += 1
            elif in_multi_line:
                comment_lines += 1
            # Check for single-line comments
            elif file_ext in comment_markers and line.lstrip().startswith(comment_markers[file_ext]):
                comment_lines += 1
        
        # Count branchings (if, else, switch, etc.)
        branch_keywords = {
            'py': ['if', 'elif', 'else', 'for', 'while', 'try', 'except'],
            'js': ['if', 'else', 'for', 'while', 'switch', 'case', 'try', 'catch'],
            'java': ['if', 'else', 'for', 'while', 'switch', 'case', 'try', 'catch'],
            'c': ['if', 'else', 'for', 'while', 'switch', 'case'],
            'cpp': ['if', 'else', 'for', 'while', 'switch', 'case', 'try', 'catch'],
            'cs': ['if', 'else', 'for', 'while', 'switch', 'case', 'try', 'catch']
        }
        
        branch_count = 0
        if file_ext in branch_keywords:
            code_text = ' '.join(code_lines)
            for keyword in branch_keywords[file_ext]:
                # Simple regex to count branch keywords
                import re
                pattern = r'\b' + keyword + r'\b'
                branch_count += len(re.findall(pattern, code_text))
        
        # Estimate complexity
        # Simple estimation of cyclomatic complexity based on branch count
        v_g = max(1, branch_count)
        
        # Estimate Halstead metrics
        # Count unique operators and operands (simplified)
        operators = {'+', '-', '*', '/', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!'}
        operators_count = 0
        
        for line in code_lines:
            for op in operators:
                operators_count += line.count(op)
        
        # Generate metrics for prediction
        metrics = {
            'loc': loc,
            'v(g)': v_g,
            'ev(g)': max(1, v_g // 2),  # Simplified estimation
            'iv(g)': max(1, v_g // 3),  # Simplified estimation
            'branchCount': branch_count,
            'loCode': loc - blank_lines - comment_lines,
            'loComment': comment_lines,
            'loBlank': blank_lines,
            'locCodeAndComment': loc - blank_lines,
            'total_Op': operators_count,
            'uniq_Op': min(len(operators), operators_count),
            'uniq_Opnd': max(10, loc // 10),  # Simplified estimation
            'total_Opnd': max(20, loc // 5),  # Simplified estimation
            'n': max(20, loc // 4),  # Simplified estimation for program vocabulary
            'v': max(100, loc * 3),  # Simplified estimation for program volume
            'd': max(5, branch_count / 2),  # Simplified estimation for difficulty
            'e': max(1000, loc * branch_count * 10),  # Simplified estimation for effort
            'b': max(0.1, branch_count / 50)  # Simplified estimation for bugs
        }
        
        return metrics
        
    except Exception as e:
        logging.error(f"Error extracting metrics from code: {e}")
        return None

def algorithmic_prediction(input_data):
    """Fallback algorithmic prediction when ML model is unavailable"""
    # Define weights for important metrics
    weights = {
        'loc': 0.15,         # Lines of code
        'v(g)': 0.25,        # Cyclomatic complexity
        'ev(g)': 0.15,       # Essential complexity
        'iv(g)': 0.10,       # Design complexity
        'd': 0.15,           # Difficulty
        'e': 0.20,           # Effort
        'branchCount': 0.10, # Branch count
        'b': 0.35,           # Bugs estimate (if available)
        'n': 0.05,           # Program vocabulary
        'v': 0.10            # Program volume
    }
    
    # Calculate bug score based on available metrics
    bug_score = 0
    weight_sum = 0
    
    for metric, weight in weights.items():
        if metric in input_data and input_data[metric] is not None:
            # Normalize the metric based on typical ranges
            normalized_value = normalize_metric(metric, input_data[metric])
            bug_score += normalized_value * weight
            weight_sum += weight
    
    # If no metrics available, default to 50% probability
    if weight_sum == 0:
        probability = 0.5
    else:
        probability = bug_score / weight_sum
    
    # Generate top metrics with influence scores
    top_metrics = {}
    for metric, weight in sorted(weights.items(), key=lambda x: x[1], reverse=True)[:5]:
        if metric in input_data and input_data[metric] is not None:
            normalized_value = normalize_metric(metric, input_data[metric])
            effective_influence = normalized_value * weight / weight_sum if weight_sum > 0 else 0
            top_metrics[metric] = {'influence': round(effective_influence, 2)}
    
    # Generate insights
    insights = generate_code_insights(input_data, 1 if probability > 0.5 else 0, top_metrics)
    
    return {
        'prediction': 1 if probability > 0.5 else 0,
        'probability': round(probability, 2),
        'input': input_data,
        'top_metrics': top_metrics,
        'insights': insights,
        'is_ai_prediction': False
    }

def normalize_metric(metric, value):
    """Normalize metrics to 0-1 range based on typical values"""
    if value is None:
        return 0.5
        
    if metric == 'loc':
        # Lines of code: higher is more bug-prone
        return min(1.0, value / 1000)
    elif metric == 'v(g)':
        # Cyclomatic complexity: >10 is considered complex
        return min(1.0, value / 25)
    elif metric == 'ev(g)':
        # Essential complexity: >4 is considered complex
        return min(1.0, value / 15)
    elif metric == 'iv(g)':
        # Design complexity
        return min(1.0, value / 20)
    elif metric == 'd':
        # Difficulty: higher is more bug-prone
        return min(1.0, value / 50)
    elif metric == 'e':
        # Effort: higher is more bug-prone
        return min(1.0, value / 10000)
    elif metric == 'b':
        # Direct bug estimate: higher is more bug-prone
        return min(1.0, value * 5)
    elif metric == 'branchCount':
        # Branch count: higher is more bug-prone
        return min(1.0, value / 50)
    elif metric == 'n':
        # Program vocabulary: higher is more bug-prone
        return min(1.0, value / 200)
    elif metric == 'v':
        # Program volume: higher is more bug-prone
        return min(1.0, value / 5000)
    else:
        # Default normalization
        return 0.5

def generate_code_insights(input_data, prediction, top_metrics):
    """Generate insightful recommendations based on metrics and prediction"""
    insights = []
    
    # Add general recommendation based on prediction
    if prediction == 1:
        insights.append({
            "type": "warning",
            "title": "High Bug Risk Detected",
            "message": "This code has a significant risk of containing bugs based on its metrics."
        })
    else:
        insights.append({
            "type": "success",
            "title": "Low Bug Risk",
            "message": "This code appears to have a low risk of bugs based on its metrics."
        })
    
    # Add specific insights based on metrics
    if 'v(g)' in input_data and input_data['v(g)'] is not None:
        if input_data['v(g)'] > 15:
            insights.append({
                "type": "suggestion",
                "title": "High Cyclomatic Complexity",
                "message": "Consider refactoring complex functions into smaller, more manageable units."
            })
    
    if 'loc' in input_data and input_data['loc'] is not None:
        if input_data['loc'] > 500:
            insights.append({
                "type": "suggestion",
                "title": "Large Code Size",
                "message": "This module is quite large. Consider breaking it into smaller modules with better separation of concerns."
            })
    
    if 'd' in input_data and input_data['d'] is not None:
        if input_data['d'] > 30:
            insights.append({
                "type": "suggestion",
                "title": "High Program Difficulty",
                "message": "The program has high difficulty which may lead to maintenance issues. Try to simplify the implementation."
            })
    
    if 'e' in input_data and input_data['e'] is not None:
        if input_data['e'] > 5000:
            insights.append({
                "type": "suggestion",
                "title": "High Mental Effort Required",
                "message": "This code requires significant mental effort to understand. Consider adding more comments and breaking down complex parts."
            })
    
    if 'branchCount' in input_data and input_data['branchCount'] is not None:
        if input_data['branchCount'] > 20:
            insights.append({
                "type": "suggestion",
                "title": "High Branch Count",
                "message": "High number of branches makes code harder to test thoroughly. Consider simplifying conditional logic."
            })
    
    return insights

@app.route('/predict_batch', methods=['POST'])
def predict_batch():
    """Handle batch prediction from CSV file"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
            
        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'Only CSV files are supported'}), 400
            
        # Save file to temp storage
        filename = f"batch_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.csv"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Read CSV
        try:
            df = pd.read_csv(filepath)
            logging.info(f"Successfully read CSV with {len(df)} rows")
        except Exception as e:
            return jsonify({'error': f'Error reading CSV: {str(e)}'}), 400
        
        predictions = []
        
        if model is not None and scaler is not None and feature_names is not None:
            try:
                # Process each row
                for index, row in df.iterrows():
                    if index >= 20:  # Limit to 20 predictions for performance
                        break
                        
                    # Extract features our model knows
                    row_data = row.to_dict()
                    
                    # Create a DataFrame with the input data for the ML model
                    row_df = pd.DataFrame([row_data])
                    
                    # Extract features that our model knows about
                    available_features = [f for f in feature_names if f in row_data]
                    
                    # Prepare feature vector for prediction
                    X = row_df[available_features].fillna(0)
                    
                    # Scale the features
                    X_scaled = scaler.transform(X)
                    
                    # Get prediction from model
                    prediction_proba = model.predict_proba(X_scaled)[0]
                    prediction = 1 if prediction_proba[1] > 0.5 else 0
                    
                    # Calculate feature importance for this prediction
                    if hasattr(model, 'feature_importances_'):
                        # For tree-based models
                        importance_scores = model.feature_importances_
                        feature_importance = dict(zip(feature_names, importance_scores))
                        
                        # Sort by importance and get top features
                        top_features = {k: {'influence': round(v, 2)} 
                                      for k, v in sorted(feature_importance.items(), 
                                                         key=lambda item: item[1], 
                                                         reverse=True)[:5]}
                    else:
                        # Fallback for non-tree models
                        top_features = {
                            'loc': {'influence': 0.8},
                            'v(g)': {'influence': 0.7},
                            'e': {'influence': 0.6},
                            'd': {'influence': 0.5},
                            'b': {'influence': 0.4}
                        }
                    
                    # Generate insights based on the prediction
                    insights = generate_code_insights(row_data, prediction, top_features)
                    
                    # Create the prediction response
                    pred_response = {
                        'prediction': prediction,
                        'probability': round(float(prediction_proba[1]), 2),
                        'input': row_data,
                        'top_metrics': top_features,
                        'insights': insights,
                        'is_ai_prediction': True
                    }
                    
                    # Add filename or identifier
                    pred_response['file_id'] = f"File_{index+1}"
                    if 'filename' in row:
                        pred_response['filename'] = row['filename']
                        
                    predictions.append(pred_response)
                    
                return jsonify({
                    'predictions': predictions,
                    'count': len(predictions),
                    'is_ai_prediction': True
                })
                
            except Exception as e:
                logging.error(f"Error in batch prediction: {e}")
                # Fall back to algorithmic approach
                pass
        
        # Fallback to algorithmic approach for each row
        for index, row in df.iterrows():
            if index >= 20:  # Limit to 20 predictions for performance
                break
                
            row_data = row.to_dict()
            pred_response = algorithmic_prediction(row_data)
            
            # Add filename or identifier
            pred_response['file_id'] = f"File_{index+1}"
            if 'filename' in row:
                pred_response['filename'] = row['filename']
                
            predictions.append(pred_response)
            
        return jsonify({
            'predictions': predictions,
            'count': len(predictions),
            'is_ai_prediction': False
        })
        
    except Exception as e:
        logging.error(f"Error in predict_batch endpoint: {e}")
        return jsonify({'error': f'Error processing request: {str(e)}'}), 500

# Terms and Privacy routes for signup page links
@app.route('/terms')
def terms():
    return "<h1>Terms of Service</h1><p>This is a placeholder for the Terms of Service.</p>"

@app.route('/privacy')
def privacy():
    return "<h1>Privacy Policy</h1><p>This is a placeholder for the Privacy Policy.</p>"

@app.route('/test_predict')
def test_predict():
    """Simple test page for prediction functionality"""
    return render_template('test_predict.html')

@app.route('/ping_model')
def ping_model():
    """Check if the ML model is available for predictions"""
    return jsonify({
        'model_available': model is not None and scaler is not None and feature_names is not None,
        'timestamp': int(time.time())
    })

if __name__ == '__main__':
    app.run(debug=True) 