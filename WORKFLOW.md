# TrekBuddy Collaboration Workflow & Standards

## 🚨 CRITICAL: READ BEFORE CONTRIBUTING

**Status:** Stabilization & Cleanup Phase
**Project Goal:** Stability > Speed. No new features.

---

## 👥 Team Roles

### 👤 Developer A (Lead / Owner)
*   **Scope:** Project Architecture, Routing, Authentication, Firestore Logic.
*   **Authority:**
    *   Approves ALL merges.
    *   Defines "DONE".
    *   Manages `main` branch.

### 👤 Developer B (Contributor)
*   **Scope:** UI Alignment, Spacing, Responsiveness, Button Interactions, Component Polish.
*   **Restrictions:**
    *   ❌ NO Firestore rule changes.
    *   ❌ NO Auth logic modification.
    *   ❌ NO Routing structure changes.
    *   ❌ NO Layout refactoring without approval.

---

## 🌳 Branching Strategy

| Branch | Purpose | Permissions |
| :--- | :--- | :--- |
| `main` | **STABLE / DEMO READY**. Source of truth. | Lead ONLY. |
| `dev` | Integration branch. All features merge here first. | Lead Approvable. |
| `feature/<name>` | Individual task work. | Contributor/Lead. |

**Rules:**
1.  NEVER commit directly to `main` or `dev`.
2.  Create a branch for EVERY task: `git checkout -b feature/my-task-name`.
3.  Merge Request flow: `feature/...` → `dev` → (Test) → `main`.

---

## 🔒 File Ownership & Conflict Prevention

**Rule:** Only **ONE** person modifies a file at a time.

**Before starting work, check the [TEAM_TASKS.md](./TEAM_TASKS.md) board.**
1.  Claim your file/task.
2.  Verify no one else is working on that file.
3.  If a file is locked, **WAIT**.

---

## 🛠 Workflow Steps

1.  **Define:** Lead posts task in `TEAM_TASKS.md`.
2.  **Branch:** Contributor creates `feature/<task-name>`.
3.  **Work:** Edit ONLY assigned files. No "while I'm at it" fixes.
4.  **Commit:** `git commit -m "Fix: specific spacing on dashboard"` (Clear messages!).
5.  **Review:** Lead reviews for logic, scope creep, and flow breaks.
6.  **Merge:** Lead merges to `dev`.
7.  **Test:** Both test on `dev`.
8.  **Release:** Lead merges `dev` → `main`.

---

## 🚫 Forbidden Actions (Zero Tolerance)

*   Working on the same file simultaneously.
*   Merging without a review.
*   Changing Auth/Data logic as a Contributor.
*   "It works on my machine" (Test on `dev`!).
*   Large refactors without pre-approval.
