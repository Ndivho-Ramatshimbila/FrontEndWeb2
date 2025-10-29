# TODO: Fix Event Approval Status Reflection for Organizers

## Tasks
- [x] Update AdminEventDetails.jsx to set both 'status' and 'organizerStatus' when approving or rejecting events
  - For approve: set status to "Approved", organizerStatus to "Approved"
  - For reject: set status to "Rejected", organizerStatus to "Rejected"
- [x] Update AttendeeDiscover component to show approved events from localStorage
  - Added getApprovedEvents function to fetch approved events
  - Modified fetchEvents useEffect to include approved events in the events list
