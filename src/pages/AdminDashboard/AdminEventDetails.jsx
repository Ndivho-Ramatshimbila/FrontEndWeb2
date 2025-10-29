export default function EventDetails({ event, onAction }) {
  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p>Status: {event.status}</p>

      {event.status === "Pending" && (
        <>
          <button onClick={() => onAction(event.id, "approve")}>Approve</button>
          <button onClick={() => onAction(event.id, "reject")}>Reject</button>
        </>
      )}

      {event.status === "Approved" && (
        <button onClick={() => onAction(event.id, "reject")}>Reject</button>
      )}

      {event.status === "Rejected" && (
        <button onClick={() => onAction(event.id, "approve")}>Approve</button>
      )}
    </div>
  );
}
