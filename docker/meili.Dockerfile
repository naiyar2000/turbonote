FROM getmeili/meilisearch:v1.15

# Set environment variables (these can be overridden at runtime)
ENV MEILI_ENV=development
ENV MEILI_NO_ANALYTICS=true
ENV MEILI_HTTP_ADDR=0.0.0.0:7700

# Optionally set a default master key (can be overridden at runtime)
# ENV MEILI_MASTER_KEY=your_default_master_key

# Data will be stored in /meili_data (default for Meilisearch)
VOLUME ["/meili_data"]

# Expose the default port
EXPOSE 7700

# Start Meilisearch (no CMD override needed, image does this by default)