.PHONY: build serve up

help:
	@echo "Usage: make [target]"
	@echo "Targets:"
	@echo "  build - Build the project"
	@echo "  serve - Serve the project"
	@echo "  up - Build and serve the project in one shot"

build:
	npm run build

serve:
	npx serve -s dist -l 3005
	
up:
	make build
	make serve

	
	