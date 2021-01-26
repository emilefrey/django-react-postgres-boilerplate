# Use an official Python runtime as a parent image
FROM python:3.8

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /app/backend

# installing netcat (nc) since we are using that to listen to postgres server in entrypoint.sh
RUN apt-get update && apt-get install -y --no-install-recommends netcat && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/backend
RUN pip install --upgrade pip -r requirements.txt

# Add the rest of the code
COPY . /app/backend

# Make port 8000 available for the app
EXPOSE 8000

CMD python manage.py runserver 0.0.0.0:8000

# # copy entrypoint.sh
COPY ./entrypoint.sh /app/entrypoint.sh
# run entrypoint.sh
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
