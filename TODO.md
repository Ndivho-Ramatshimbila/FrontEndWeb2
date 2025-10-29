# TODO for Admin Approvals View Details Fix

- [x] Update AdminEventDetails.jsx to import useParams and useNavigate from react-router-dom
- [x] Add staticEventsData array to AdminEventDetails.jsx (copied from ApprovalScreen.jsx)
- [x] Implement logic to load events from static and localStorage, find event by id
- [x] Render event details (title, type, date, status, etc.)
- [x] Add approve/reject buttons with conditional rendering based on status
- [x] Implement handleApprove and handleReject functions to update status in localStorage and navigate back to /admin/approvals
- [x] Update styling to match the expected EventDetails.scss with full screen layout, blue colors, and proper sections
- [x] Test the flow: Run app, go to /admin/approvals, click View Details, approve/decline, check status update (App is running on http://localhost:5174/admin/approvals)
