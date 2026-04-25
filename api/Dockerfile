FROM python:latest

COPY requirements.txt requirements.txt

# Ensure Pip is actually up to date...
RUN pip install -U pip
RUN pip install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--debug"]