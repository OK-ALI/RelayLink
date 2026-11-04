use serde::{Deserialize, Serialize};
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct FoundationState {
    pub application: String,
    pub protocol_version: u8,
    pub phase: u8,
    pub control_enabled: bool,
    pub capabilities: Vec<String>,
}
impl Default for FoundationState {
    fn default() -> Self {
        Self {
            application: "relay-link".into(),
            protocol_version: 1,
            phase: 0,
            control_enabled: false,
            capabilities: Vec::new(),
        }
    }
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn canonical_schema_and_shared_fixtures_match() {
        let schema: serde_json::Value = serde_json::from_str(include_str!(
            "../../../packages/protocol-schema/schema/foundation-state.schema.json"
        ))
        .unwrap();
        let cases: serde_json::Value = serde_json::from_str(include_str!(
            "../../../packages/protocol-schema/fixtures/cases.json"
        ))
        .unwrap();
        let validator = jsonschema::validator_for(&schema).unwrap();
        for fixture in cases.as_array().unwrap() {
            assert_eq!(
                validator.is_valid(&fixture["value"]),
                fixture["valid"].as_bool().unwrap(),
                "{}",
                fixture["name"]
            );
        }
        assert!(validator.is_valid(&serde_json::to_value(FoundationState::default()).unwrap()));
    }
}
