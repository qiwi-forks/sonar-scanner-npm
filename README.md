# @qiwi/sonarqube-scanner

> The fork of [the fork (dvolpato/sonar-scanner-npm)](https://github.com/dvolpato/sonar-scanner-npm) of the original [SonarQube Scanner for NPM](https://github.com/bellingard/sonar-scanner-npm) to bring a bit more security for the _enterprise_ usage.

## Installation

``` sh
npm install -D @qiwi/sonarqube-scanner
```

## Usage

```js
const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl : 'https://sonarqube.mycompany.com',
    token : "019d1e2e04eefdcd0caee1468f39a45e69d33d3f",
    options: {
      'sonar.projectName': 'My App',
      'sonar.projectDescription': 'Description for "My App" project...',
      'sonar.sources': 'src',
      'sonar.tests': 'specs'
    }
  },
  () => process.exit()
)
```

Follow the upstream [docs for details](https://github.com/bellingard/sonar-scanner-npm).

## License
`sonarqube-scanner` is licensed under the [LGPL v3 License](http://www.gnu.org/licenses/lgpl.txt).
