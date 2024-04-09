FROM python:3.9

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

WORKDIR /app
COPY . /app

ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

CMD ["./wait-for-it.sh", "database:3306", "--", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
