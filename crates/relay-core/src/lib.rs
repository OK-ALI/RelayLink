pub use relay_protocol::FoundationState;
/// Local status only: no network listener or Windows execution engine exists in Phase 0.
pub fn foundation_status() -> FoundationState {
    FoundationState::default()
}
#[cfg(test)]
mod tests {
    #[test]
    fn foundation_never_grants_control() {
        let state = super::foundation_status();
        assert!(!state.control_enabled);
        assert!(state.capabilities.is_empty());
        assert_eq!(state.phase, 0);
    }
}
