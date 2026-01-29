# Security Policy

## Reporting a Vulnerability

The Outline team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

If you discover a security vulnerability in outline, please disclose it via [GitHub](https://github.com/outline/outline/security/advisories/new). The Outline maintainers will send a response indicating the next steps in handling your report. After the initial reply to your report you will be kept informed of the progress towards a fix and full announcement.

Report security bugs in third-party dependencies to the person or team maintaining the module.

## API keys and access control

Personal API keys are created from the user settings page at `/settings/api-and-apps`. Creation is limited to members who are not guests or viewers, and it is enabled for admins or when the team preference `membersCanCreateApiKey` is turned on. Workspace-wide API key management at `/settings/api-keys` is admin-only and available only in the cloud-hosted environment.
