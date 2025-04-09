import os
import re

def update_html_links():
    template_dir = 'templates'
    
    for filename in os.listdir(template_dir):
        if filename.endswith('.html'):
            file_path = os.path.join(template_dir, filename)
            
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Update links to use Flask's url_for
            content = re.sub(
                r'href="index\.html"', 
                'href="{{ url_for(\'index\') }}"', 
                content
            )
            content = re.sub(
                r'href="start\.html"', 
                'href="{{ url_for(\'start\') }}"', 
                content
            )
            content = re.sub(
                r'href="introduction\.html"', 
                'href="{{ url_for(\'introduction\') }}"', 
                content
            )
            content = re.sub(
                r'href="features\.html"', 
                'href="{{ url_for(\'features\') }}"', 
                content
            )
            content = re.sub(
                r'href="how-it-works\.html"', 
                'href="{{ url_for(\'how_it_works\') }}"', 
                content
            )
            content = re.sub(
                r'href="team\.html"', 
                'href="{{ url_for(\'team\') }}"', 
                content
            )
            content = re.sub(
                r'href="help\.html"', 
                'href="{{ url_for(\'help\') }}"', 
                content
            )
            content = re.sub(
                r'href="analyzer\.html"', 
                'href="{{ url_for(\'analyzer\') }}"', 
                content
            )
            content = re.sub(
                r'href="predictor\.html"', 
                'href="{{ url_for(\'predictor\') }}"', 
                content
            )
            content = re.sub(
                r'href="upload\.html"', 
                'href="{{ url_for(\'upload\') }}"', 
                content
            )
            content = re.sub(
                r'href="results\.html"', 
                'href="{{ url_for(\'results\') }}"', 
                content
            )
            
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            
            print(f"Updated links in {filename}")

if __name__ == "__main__":
    update_html_links() 