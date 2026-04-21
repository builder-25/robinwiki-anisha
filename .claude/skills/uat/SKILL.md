---
name: uat
description: Run the Robin E2E ingest acceptance test suite. DESTRUCTIVE — wipes DB.
---

Run the ingest UAT suite:

```bash
bash .uat/ingest/ingest.sh
```

See `.uat/ingest/` for individual plan files. Run `bash .uat/ingest/ingest.sh <plan-name>` for a specific plan.
