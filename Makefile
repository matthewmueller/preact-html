
test:
	@./node_modules/.bin/mocha
	@./node_modules/.bin/devtool node_modules/mocha/bin/_mocha -qc -- test/

check:
	@./node_modules/.bin/browserify lib/index.js > bundle.js

.PHONY: test
