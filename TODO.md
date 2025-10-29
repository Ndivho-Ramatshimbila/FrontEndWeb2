# TODO for Admin Approvals View Details Fix

- [x] Update AdminEventDetails.jsx to import useParams and useNavigate from react-router-dom
- [x] Add staticEventsData array to AdminEventDetails.jsx (copied from ApprovalScreen.jsx)
- [x] Implement logic to load events from static and localStorage, find event by id
- [x] Render event details (title, type, date, status, etc.)
- [x] Add approve/reject buttons with conditional rendering based on status
- [x] Implement handleApprove and handleReject functions to update status in localStorage and navigate back to /admin/approvals
- [x] Update styling to match the expected EventDetails.scss with full screen layout, blue colors, and proper sections
- [x] Make status updates responsive: update local state immediately and dispatch event to refresh ApprovalScreen
- [x] Include all events in admin approvals list (show all events including approved)
- [x] Include "Approved" tab in tabs array to view approved events
- [x] Remove approved events from static data in both files
- [x] Start with clean slate: only 3 pending events in static data, no rejected or approved
- [x] "All" tab now shows all events (pending, approved, rejected)
- [x] Override static events with localStorage events if same id (so approved/rejected events replace pending ones)
- [x] Test the flow: Run app, go to /admin/approvals, click View Details on pending event, approve it, check it moves to Approved tab (App is running on http://localhost:5174/admin/approvals)
- [x] To clear localStorage: Open browser dev tools and run localStorage.clear()
