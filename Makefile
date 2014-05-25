TESTS = $(shell find test -name "*Test.js")
SRC = $(shell find src -name "*.js")

build:
	make test
	./node_modules/.bin/gulp build
test:
	./node_modules/.bin/mocha $(SRC) $(TESTS) -G --reporter spec
testw:
	./node_modules/.bin/mocha $(SRC) $(TESTS)  -w -G --reporter spec

.PHONY: build test clean
