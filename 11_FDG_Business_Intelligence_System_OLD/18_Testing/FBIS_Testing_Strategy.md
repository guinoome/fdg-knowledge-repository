# FBIS Testing Strategy

Required test classes:
- unit
- pricing
- voucher
- order lifecycle
- payment lifecycle
- webhook verification
- idempotency
- duplicate events
- refund
- reconciliation
- authorization
- retry/failure
- recovery

Critical scenarios:
1. successful payment
2. failed payment
3. duplicate webhook
4. invalid webhook
5. amount mismatch
6. wrong order ID
7. expired voucher
8. voucher race condition
9. 100% discount
10. partial refund
11. provider timeout
12. provider unavailable

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System_OLD/11_FDG_Business_Intelligence_System_Master_Index|11 FDG Business Intelligence System Master Index]] → this document
