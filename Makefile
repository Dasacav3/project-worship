version-patch:
	@echo "Bumping patch version..."
	@npm version patch -f
	@echo "Done."

version-minor:
	@echo "Bumping minor version..."
	@npm version minor -f
	@echo "Done."

version-major:
	@echo "Bumping major version..."
	@npm version major
	@echo "Done."

version-patch-front:
	@echo "Bumping patch version..."
	@cd client && npm version patch -f
	@cd ..
	@echo "Done."
	
version-minor-front:
	@echo "Bumping minor version..."
	@cd client && npm version minor -f
	@cd ..
	@echo "Done."

version-major-front:
	@echo "Bumping major version..."
	@cd client && npm version major -f
	@cd ..
	@echo "Done."
