const exec = require('child_process').execFile
const log = require('fancy-log')
const process = require('process')
const assert = require('assert')
const prepareExecEnvironment = require('./sonar-scanner-executable').prepareExecEnvironment
const scannerExecutable = require('./sonar-scanner-executable').getSonarScannerExecutable
const localscannerExecutable = require('./sonar-scanner-executable').getLocalSonarScannerExecutable

module.exports = scan
module.exports.cli = scanCLI
module.exports.customScanner = scanUsingCustomScanner
module.exports.fromParam = fromParam

const version = require('../package.json').version

/*
 * Function used programmatically to trigger an analysis.
 */
function scan(params, callback) {
  scanCLI([], params, callback)
}

/*
 * Function used by the '/bin/sonar-scanner' executable that accepts command line arguments.
 */
function scanCLI(cliArgs, params, callback = () => {}) {
  log('Starting analysis...')

  assert.equal(typeof callback, 'function', `cb must be a function: ${callback}`)

  // prepare the exec options, most notably with the SQ params
  const optionsExec = prepareExecEnvironment(params, process)

  // determine the command to run and execute it
  scannerExecutable((sqScannerCommand) => {
    try {
      exec(sqScannerCommand, fromParam().concat(cliArgs), optionsExec, (err, stdout, stderr) => {
        log('Analysis finished.')
        callback(err, stdout, stderr)
      })
    } catch (error) {
      callback(error)
      process.exit(error.status)
    }
  })
}

/*
 * Alternatively, trigger an analysis with a local install of the SonarScanner.
 */
function scanUsingCustomScanner(params, callback) {
  log('Starting analysis (with local install of the SonarScanner)...')

  // prepare the exec options, most notably with the SQ params
  const optionsExec = prepareExecEnvironment(params, process)

  // determine the command to run and execute it
  localscannerExecutable((sqScannerCommand) => {
    try {
      exec(sqScannerCommand, fromParam(), optionsExec, (err, stdout, stderr) => {
        log('Analysis finished.')
        callback(err, stdout, stderr)
      })
    } catch (error) {
      callback(error)
      process.exit(error.status)
    }
  })
}

function fromParam() {
  return [`--from=ScannerNpm/${version}`]
}
