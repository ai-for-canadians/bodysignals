#!/bin/bash
# Automated forbidden-phrase regression test for Body Signals
# Fails if any liability-risk phrases appear in source code.
# Run: npm run check:phrases
# See docs/CONTENT_STANDARDS.md "Research Publisher Positioning" for rationale.
#
# Context-aware: phrases in editorial/legal pages that appear in a "what we are not"
# or instructional context are excluded via grep -v patterns.

set -euo pipefail

ERRORS=0

echo "=== Forbidden Phrase Check ==="
echo ""

# Helper: search for pattern, exclude known-safe files, report matches
check() {
  local label="$1"
  local pattern="$2"
  shift 2
  # Search app/, components/, lib/data/ for .ts/.tsx files
  local hits
  hits=$(grep -r -i -E "$pattern" app/ components/ lib/data/ \
    --include="*.ts" --include="*.tsx" \
    2>/dev/null \
    | grep -v node_modules \
    | grep -v ".next" \
    | grep -v "// forbidden-phrase-ok" \
    | grep -v "not a medical site" \
    | grep -v "not a healthcare provider" \
    | grep -v "not a health education" \
    | grep -v "not a telehealth" \
    | grep -v "What We Are Not" \
    | grep -v "We are not" \
    || true)

  if [ -n "$hits" ]; then
    echo "FAIL: Found '$label':"
    echo "$hits" | head -5
    echo ""
    ERRORS=$((ERRORS + 1))
  fi
}

echo "--- Identity framing ---"
check "medical site" "medical site|medical information site|health information site"
check "health education publisher" "health education publisher|health education service"
check "doctor-reviewed" "doctor-reviewed|physician-approved"

echo "--- Directive language ---"
check "we recommend (in content)" "we recommend"

echo "--- Prohibited framing ---"
# "health advice" is OK in "not medical advice" / "not health advice" disclaimers
hits_ha=$(grep -r -i "health advice" app/ components/ lib/data/ \
  --include="*.ts" --include="*.tsx" \
  2>/dev/null \
  | grep -v node_modules \
  | grep -v ".next" \
  | grep -v "not.*medical advice" \
  | grep -v "not.*health advice" \
  | grep -v "// forbidden-phrase-ok" \
  || true)

if [ -n "$hits_ha" ]; then
  echo "FAIL: Found 'health advice' (outside disclaimers):"
  echo "$hits_ha" | head -5
  echo ""
  ERRORS=$((ERRORS + 1))
fi

echo ""
if [ $ERRORS -gt 0 ]; then
  echo "FAILED: $ERRORS forbidden phrase violation(s) found."
  echo "See docs/CONTENT_STANDARDS.md 'Research Publisher Positioning' for replacement guide."
  exit 1
else
  echo "PASSED: No forbidden phrases found."
  exit 0
fi
