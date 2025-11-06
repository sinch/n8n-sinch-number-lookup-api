# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-06

### Added
- Initial release of Sinch Number Lookup API node for n8n
- OAuth2 authentication support with client credentials flow
- Lookup operation with configurable features:
  - Line Type detection (carrier, porting status, MCC/MNC)
  - SIM Swap detection
  - VoIP Detection
  - RND (Reassigned Number Database) checking
- E.164 phone number format validation
- Dynamic request body construction based on selected features
- Comprehensive documentation and setup guides
