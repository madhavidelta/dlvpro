#!/bin/bash

# Demo script to show UI mode capabilities
# This script demonstrates the different ways to run the BDD tests

echo "=========================================="
echo "  Delta Vacations Pro - UI Mode Demo"
echo "=========================================="
echo ""
echo "This repository supports multiple test execution modes:"
echo ""

echo "1. HEADLESS MODE (Default - Fast, no browser window)"
echo "   Command: npm test"
echo "   Use case: CI/CD pipelines, automated testing"
echo "   Browser: Hidden (headless)"
echo ""

echo "2. UI MODE (Visible browser window)"
echo "   Command: npm run test:ui"
echo "   OR: npm run test:headed"
echo "   Use case: Development, debugging, demonstrations"
echo "   Browser: Visible with 100ms slow motion"
echo ""

echo "3. DEBUG MODE (Playwright Inspector)"
echo "   Command: npm run test:debug"
echo "   Use case: Advanced debugging with step-by-step control"
echo "   Browser: Visible with inspector tools"
echo ""

echo "=========================================="
echo "  Quick Start"
echo "=========================================="
echo ""
echo "To see the tests run with a visible browser:"
echo "  $ npm run test:ui"
echo ""
echo "To run tests normally (headless):"
echo "  $ npm test"
echo ""
echo "For more information, see:"
echo "  - README.md - Full documentation"
echo "  - UI_MODE_GUIDE.md - Detailed UI mode guide"
echo "  - QUICKSTART.md - Getting started guide"
echo ""
