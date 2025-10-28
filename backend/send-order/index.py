import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заявки с сайта на email
    Args: event - dict с httpMethod, body (name, phone, product, comment)
          context - object с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    product = body_data.get('product', '')
    comment = body_data.get('comment', '')
    
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    if not smtp_password:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'SMTP not configured'})
        }
    
    email_from = 'Frankbyboy@yandex.ru'
    email_to = 'Frankbyboy@yandex.ru'
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта FRANK - {product}'
    msg['From'] = email_from
    msg['To'] = email_to
    
    html_body = f'''
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #17a2b8;">Новая заявка с сайта FRANK</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Имя:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Телефон:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Товар:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{product}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Комментарий:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{comment if comment else 'Не указан'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">Заявка отправлена автоматически с сайта FRANK</p>
      </body>
    </html>
    '''
    
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))
    
    try:
        with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
            server.login(email_from, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': False, 'error': str(e)})
        }
