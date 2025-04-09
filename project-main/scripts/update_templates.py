import os
import re

def update_html_files():
    template_dir = 'templates'
    
    for filename in os.listdir(template_dir):
        if filename.endswith('.html'):
            file_path = os.path.join(template_dir, filename)
            
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Update CSS references
            content = re.sub(
                r'<link\s+rel=["\']stylesheet["\']\s+href=["\']styles\.css["\']',
                '<link rel="stylesheet" href="{{ url_for(\'static\', filename=\'styles.css\') }}"',
                content
            )
            
            # Update JS references
            content = re.sub(
                r'<script\s+src=["\']script\.js["\']',
                '<script src="{{ url_for(\'static\', filename=\'script.js\') }}"',
                content
            )
            
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            
            print(f"Updated {filename}")

if __name__ == "__main__":
    update_html_files() 