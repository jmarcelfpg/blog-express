REPORTER = list
MOCHA_OPTS = --ui bdd –c

test:
    echo Starting test *********************************************************
    ./node_modules/mocha/bin/mocha \
    --reporter $(REPORTER) \
    $(MOCHA_OPTS) \
    tests/*.js
    echo Ending test

.PHONY: test