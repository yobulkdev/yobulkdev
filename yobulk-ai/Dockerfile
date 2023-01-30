FROM python:3.9-slim

# Set environment variables.
ENV PYTHONWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

# Set working directory.
WORKDIR /code

# Copy dependencies.
COPY requirements.txt /code/

# Install dependencies.
RUN pip install -r requirements.txt

# Copy project.
COPY . /code/

EXPOSE 5000