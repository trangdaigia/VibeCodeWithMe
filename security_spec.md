# Security Specification (`security_spec.md`)

## 1. Access Control & Roles (RBAC)
- **Authentication**: All database paths (except `/test/connection` for boot verification) require `isSignedIn()` (`request.auth != null`).
- **Roles**:
  - `student`: Default role for newly registered users. Can read and write only their own `/users/{userId}` document and `/users/{userId}/examHistory/{examId}` subcollection. Cannot escalate their own `role` field.
  - `teacher`: Elevated instructional role. Assigned only by an `admin`. Can view user profiles for coaching/review.
  - `admin`: Highest privilege tier. Bootstrapped via verified email (`daigia170904@gmail.com`) or existence of `/admins/{uid}`. Admins can read all user profiles, update user roles (`student` / `teacher` / `admin`), and manage exam records.

## 2. Entity Invariants

### `/users/{userId}` (`UserProfile`)
- **Path-to-Data Consistency**: `incoming().uid == userId` and `isValidId(userId)`.
- **Ownership**: Only `isOwner(userId)` or `isAdmin()` can create or update. `teacher` can read profiles for academic review.
- **Role Escalation Prevention**:
  - On `create`: `incoming().role == 'student' || isAdmin()`
  - On `update`: `incoming().role == existing().role || isAdmin()`
- **Immutable Fields on Update**:
  - `incoming().uid == existing().uid`
  - `incoming().createdAt == existing().createdAt`
- **Timestamps**:
  - On `create`: `incoming().createdAt == request.time && incoming().updatedAt == request.time`
  - On `update`: `incoming().updatedAt == request.time`
- **Bounded Strings & Lists**:
  - `email`: string, valid email regex, `size() <= 256`
  - `displayName`: string, `size() >= 1 && size() <= 100`
  - `photoURL`: string, `size() <= 500`
  - `role`: `'student'`, `'teacher'`, or `'admin'`
  - `selectedLanguageId`: in `['english', 'chinese', 'japanese', 'korean', 'french', 'german', 'spanish']`
  - `xp`: number, `>= 0 && <= 10000000`
  - `dailyXpGoal`: number, `>= 10 && <= 5000`
  - `todayXp`: number, `>= 0 && <= 100000`
  - `todayDate`: string, `size() <= 20`
  - `streak`: number, `>= 0 && <= 10000`
  - `lastActiveDate`: string, `size() <= 20`
  - `examsCompleted`: number, `>= 0 && <= 10000`
  - `bonusWordsMastered`: number, `>= 0 && <= 100000`
  - `targetBand`: string, `size() >= 1 && size() <= 32`
  - `voiceSpeed`: number, `>= 0.5 && <= 2.0`
  - `soundEnabled`: bool
  - `completedLessonIds`: list, `size() <= 100`
  - `unlockedAchievementIds`: list, `size() <= 50`

### `/users/{userId}/examHistory/{examId}` (`ExamRecord`)
- **Path-to-Data Consistency**: `incoming().examId == examId && incoming().userId == userId`.
- **Ownership**: Only `isOwner(userId)` or `isAdmin()` can create/delete. Owners, teachers, and admins can read.
- **Immutability**: Exam records are append-only (`allow update: if false;`).
- **Timestamps**: `incoming().createdAt == request.time`.

## 3. Dirty Dozen Attack Vectors Mitigated
1. **Unauthenticated read/write**: Blocked by `isSignedIn()`.
2. **Horizontal privilege escalation**: Blocked by `isOwner(userId)`.
3. **Vertical privilege escalation (`role: 'admin'`)**: Blocked by `incoming().role == 'student' || isAdmin()` on create and `incoming().role == existing().role || isAdmin()` on update.
4. **Extra undocumented fields injection**: Blocked by `incoming().keys().hasOnly(...)`.
5. **Missing required fields**: Blocked by `incoming().keys().hasAll(...)`.
6. **String buffer/megabyte payload**: Blocked by `.size() <= MAX` on every string and list.
7. **UID spoofing in body**: Blocked by `incoming().uid == userId`.
8. **Timestamp forgery**: Blocked by `incoming().createdAt == request.time` and `incoming().updatedAt == request.time`.
9. **Creation timestamp tampering on update**: Blocked by `incoming().createdAt == existing().createdAt`.
10. **Negative XP/score injection**: Blocked by `>= 0` numeric bounds.
11. **Path traversal in IDs**: Blocked by `isValidId()`.
12. **Exam history tampering**: Blocked by `allow update: if false;`.
