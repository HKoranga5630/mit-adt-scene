
import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Bell,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  Check,
  X,
  Plus,
  Users,
} from 'lucide-react';

import { ClubLogo } from '@/components/hub-cards';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Panel } from '@/components/dashboard-shell';

import {
  clubs as initialClubs,
  events as initialEvents,
  clubById,
  notifications,
  announcements as initialAnnouncements,
  registrations,
  pendingClubs,
  hubUsers as initialUsers,
  participation,
  type Club,
  type CollegeEvent,
  type Category,
} from '@/data/hub';

import { useDemo } from '@/data/demo-store';

const repClub = clubById('aces');

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

function formatDate(value: string) {
  if (!value) return '';

  return new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function EventRow({
  e,
  children,
}: {
  e: CollegeEvent;
  children?: ReactNode;
}) {
  return (
    <div className="dash-row">
      <img
        src={e.image}
        alt={e.name}
        width={72}
        height={48}
        className="h-12 w-[72px] rounded object-cover"
      />

      <div className="min-w-0 flex-1">
        <Link
          to="/events/$eventId"
          params={{ eventId: e.id }}
          className="font-semibold text-sm hover:text-primary"
        >
          {e.name}
        </Link>

        <p className="text-xs text-muted-foreground">
          {e.date} · {e.time} · {e.venue}
        </p>
      </div>

      {children}
    </div>
  );
}

// STUDENT DASHBOARD COMPONENTS

export function UpcomingEventsPanel() {
  const { events: liveEvents } = useDemo();

  return (
    <Panel
      title="Upcoming Events"
      action={
        <Button asChild variant="link" size="sm">
          <Link to="/events">View all</Link>
        </Button>
      }
    >
      {liveEvents.map((e) => (
        <EventRow key={e.id} e={e}>
          <Button asChild size="sm" variant="outline">
            <Link to="/events/$eventId" params={{ eventId: e.id }}>
              View Details
            </Link>
          </Button>
        </EventRow>
      ))}
    </Panel>
  );
}

export function BrowseClubsPanel() {
  const { clubs: liveClubs } = useDemo();

  return (
    <Panel
      title="Browse Clubs"
      action={
        <Button asChild variant="link" size="sm">
          <Link to="/clubs">All clubs</Link>
        </Button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {liveClubs.map((c) => (
          <Link
            key={c.id}
            to="/clubs/$clubId"
            params={{ clubId: c.id }}
            className="rounded-md border border-border p-3 hover:border-primary"
          >
            <ClubLogo club={c} />
            <p className="text-sm font-semibold">{c.name}</p>
            <span className="category-badge mt-2" data-category={c.category}>
              {c.category}
            </span>
          </Link>
        ))}
      </div>
    </Panel>
  );
}

export function MyEventsPanel() {
  const { events: liveEvents, registered } = useDemo();

  const myEvents = registered
    .map((id) => liveEvents.find((e) => e.id === id))
    .filter((e): e is CollegeEvent => Boolean(e));

  return (
    <Panel title={`My Registered Events (${myEvents.length})`}>
      {myEvents.length ? (
        myEvents.map((e) => (
          <EventRow key={e.id} e={e}>
            <span className="category-badge" data-category="Community">
              Registered
            </span>
          </EventRow>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No events registered in this demo yet.
        </p>
      )}
    </Panel>
  );
}

export function MyClubsPanel() {
  const { clubs: liveClubs, joined } = useDemo();

  const myClubs = joined
    .map((id) => liveClubs.find((c) => c.id === id))
    .filter((c): c is Club => Boolean(c));

  return (
    <Panel title={`My Clubs (${myClubs.length})`}>
      {myClubs.length ? (
        myClubs.map((c) => (
          <div key={c.id} className="dash-row">
            <div className="flex-1 min-w-0">
              <Link
                to="/clubs/$clubId"
                params={{ clubId: c.id }}
                className="font-semibold text-sm hover:text-primary"
              >
                {c.name}
              </Link>

              <p className="text-xs text-muted-foreground">
                {c.category} · {c.members} members
              </p>
            </div>

            <Button asChild size="sm" variant="outline">
              <Link to="/clubs/$clubId" params={{ clubId: c.id }}>
                View Club
              </Link>
            </Button>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No clubs joined in this demo yet.
        </p>
      )}
    </Panel>
  );
}

export function NotificationsPanel({ limit }: { limit?: number }) {
  return (
    <Panel
      title="Notifications"
      action={
        limit ? (
          <Button asChild variant="link" size="sm">
            <Link to="/student/notifications">View all</Link>
          </Button>
        ) : undefined
      }
    >
      {notifications.slice(0, limit ?? notifications.length).map((n) => (
        <div key={n.id} className="dash-row items-start">
          <Bell size={16} className="mt-0.5 text-primary shrink-0" />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{n.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{n.body}</p>
          </div>

          <span className="text-xs text-muted-foreground">{n.time}</span>
        </div>
      ))}
    </Panel>
  );
}

// CLUB REPRESENTATIVE COMPONENTS

export function ClubProfilePanel() {
  const { clubs, setClubs } = useDemo();
  const currentClub = clubs.find((c) => c.id === 'aces');

  if (!currentClub) return null;

  function editProfile() {
    const name = window.prompt('Enter club name:', currentClub!.name);
    if (name === null || !name.trim()) return;

    const about = window.prompt('Enter club description:', currentClub!.about);
    if (about === null) return;

    setClubs((current) =>
      current.map((club) =>
        club.id === 'aces'
          ? { ...club, name: name.trim(), about: about.trim() }
          : club
      )
    );

    window.alert('Club profile updated successfully.');
  }

  return (
    <Panel
      title="Club Profile"
      action={
        <Button size="sm" variant="outline" onClick={editProfile}>
          <Pencil size={14} />
          Edit Profile
        </Button>
      }
    >
      <ClubLogo club={currentClub} />

      <p className="font-semibold">{currentClub.name}</p>

      <span className="category-badge mt-2" data-category={currentClub.category}>
        {currentClub.category}
      </span>

      <p className="text-sm text-muted-foreground mt-3 leading-7">
        {currentClub.about}
      </p>

      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
        <Users size={14} />
        {currentClub.members} members
      </p>
    </Panel>
  );
}

export function ManageEventsPanel() {
  const { events, setEvents } = useDemo();

  const repEvents = events.filter((e) => e.club === 'ACES');

  function editEvent(event: CollegeEvent) {
    const name = window.prompt('Event name:', event.name);
    if (name === null || !name.trim()) return;

    const venue = window.prompt('Event venue:', event.venue);
    if (venue === null) return;

    const description = window.prompt(
      'Event description:',
      event.description
    );
    if (description === null) return;

    setEvents((current) =>
      current.map((e) =>
        e.id === event.id
          ? {
              ...e,
              name: name.trim(),
              venue: venue.trim(),
              description: description.trim(),
            }
          : e
      )
    );

    window.alert('Event updated successfully.');
  }

  function deleteEvent(event: CollegeEvent) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.name}"?`
    );

    if (!confirmed) return;

    setEvents((current) => current.filter((e) => e.id !== event.id));
    window.alert('Event deleted successfully.');
  }

  return (
    <Panel
      title="Manage Events"
      action={
        <Button asChild size="sm">
          <Link to="/club/create-event">
            <Plus size={14} />
            Create
          </Link>
        </Button>
      }
    >
      {repEvents.length ? (
        repEvents.map((e) => (
          <EventRow key={e.id} e={e}>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => editEvent(e)}
              >
                <Pencil size={14} />
                Edit
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteEvent(e)}
              >
                <Trash2 size={14} />
                Delete
              </Button>

              <Button asChild size="sm" variant="outline">
                <Link to="/club/registrations">
                  <Eye size={14} />
                  View Registrations
                </Link>
              </Button>
            </div>
          </EventRow>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No events created by ACES yet. Use Create to add an event.
        </p>
      )}
    </Panel>
  );
}

export function AnnouncementsPanel() {
  const { announcements, setAnnouncements } = useDemo();

  function addAnnouncement() {
    const title = window.prompt('Enter announcement title:');
    if (title === null || !title.trim()) return;

    const body = window.prompt('Enter announcement details:');
    if (body === null || !body.trim()) return;

    const newAnnouncement = {
      id: makeId('announcement'),
      title: title.trim(),
      body: body.trim(),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    setAnnouncements((current) => [newAnnouncement, ...current]);

    window.alert('Announcement published successfully.');
  }

  function deleteAnnouncement(id: string) {
    if (!window.confirm('Delete this announcement?')) return;

    setAnnouncements((current) =>
      current.filter((a) => a.id !== id)
    );
  }

  return (
    <Panel
      title="Announcements"
      action={
        <Button size="sm" variant="outline" onClick={addAnnouncement}>
          <Plus size={14} />
          New Announcement
        </Button>
      }
    >
      {announcements.length ? (
        announcements.map((a) => (
          <div key={a.id} className="dash-row items-start">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.body}</p>
              <span className="text-xs text-muted-foreground">{a.date}</span>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => deleteAnnouncement(a.id)}
              aria-label="Delete announcement"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No announcements yet.
        </p>
      )}
    </Panel>
  );
}

export function RegistrationsPanel() {
  const { events } = useDemo();

  const clubEventNames = events
    .filter((e) => e.club === 'ACES')
    .map((e) => e.name);

  const clubRegistrations = registrations.filter((r) =>
    clubEventNames.includes(r.event)
  );

  return (
    <Panel title="Registrations">
      {clubRegistrations.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Event</th>
                <th>Registered on</th>
              </tr>
            </thead>

            <tbody>
              {clubRegistrations.map((r) => (
                <tr key={r.id}>
                  <td>{r.student}</td>
                  <td>{r.email}</td>
                  <td>{r.event}</td>
                  <td>{r.registeredOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No registrations are available for your club events in this demo.
        </p>
      )}
    </Panel>
  );
}

// CREATE EVENT FORM

export function CreateEventForm() {
  const { events, setEvents } = useDemo();
  const [message, setMessage] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') || '').trim();
    const description = String(data.get('description') || '').trim();
    const dateValue = String(data.get('date') || '');
    const time = String(data.get('time') || '');
    const venue = String(data.get('venue') || '').trim();
    const deadlineValue = String(data.get('deadline') || '');

    if (!name || !description || !dateValue || !time || !venue) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const dateObject = new Date(`${dateValue}T00:00:00`);

    const newEvent: CollegeEvent = {
      id: makeId('aces-event'),
      name,
      description,
      category: 'Technology',
      date: formatDate(dateValue),
      dateISO: dateValue,
      day: String(dateObject.getDate()).padStart(2, '0'),
      month: dateObject
        .toLocaleDateString('en-US', { month: 'short' })
        .toUpperCase(),
      time,
      venue,
      club: 'ACES',
      image: events[0]?.image || '',
      deadline: deadlineValue ? formatDate(deadlineValue) : undefined,
    };

    setEvents((current) => [...current, newEvent]);

    form.reset();
    setMessage('Your event has been created successfully.');
  }

  return (
    <Panel title="Create Event">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="ev-name">Event name *</Label>
          <Input id="ev-name" name="name" required placeholder="Enter event name" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="ev-desc">Description *</Label>
          <Textarea
            id="ev-desc"
            name="description"
            rows={4}
            required
            placeholder="Describe your event"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="ev-date">Date *</Label>
            <Input id="ev-date" name="date" type="date" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ev-time">Time *</Label>
            <Input id="ev-time" name="time" type="time" required />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="ev-venue">Venue *</Label>
          <Input
            id="ev-venue"
            name="venue"
            required
            placeholder="Enter event venue"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="ev-deadline">Registration deadline</Label>
          <Input id="ev-deadline" name="deadline" type="date" />
        </div>

        <Button type="submit" className="w-fit">
          <Plus size={14} />
          Create Event
        </Button>

        {message && (
          <p className="text-sm text-muted-foreground" role="status">
            {message}
          </p>
        )}
      </form>
    </Panel>
  );
}

// ADMIN COMPONENTS

export function PendingApprovalsPanel() {
  const { approvals, setApprovals } = useDemo();

  function updateApproval(id: string, status: string) {
    setApprovals((current) => ({ ...current, [id]: status }));
  }

  return (
    <Panel title="Pending Club Approvals">
      {pendingClubs.map((p) => (
        <div key={p.id} className="dash-row">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{p.name}</p>
            <p className="text-xs text-muted-foreground">
              {p.category} · Requested by {p.representative} · {p.submitted}
            </p>

            {approvals[p.id] && (
              <p className="text-xs font-semibold mt-1">
                Status: {approvals[p.id]}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={Boolean(approvals[p.id])}
              onClick={() => updateApproval(p.id, 'Approved')}
            >
              <Check size={14} />
              Approve
            </Button>

            <Button
              size="sm"
              variant="outline"
              disabled={Boolean(approvals[p.id])}
              onClick={() => updateApproval(p.id, 'Rejected')}
            >
              <X size={14} />
              Reject
            </Button>
          </div>
        </div>
      ))}
    </Panel>
  );
}

export function UserManagementPanel() {
  const { users, setUsers } = useDemo();

  function deleteUser(id: string) {
    if (!window.confirm('Delete this demo user?')) return;

    setUsers((current) => current.filter((u) => u.id !== id));
  }

  return (
    <Panel title="User Management">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteUser(u.id)}
                  >
                    <Trash2 size={13} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

export function ClubManagementPanel() {
  const { clubs, setClubs } = useDemo();

  function deleteClub(id: string, name: string) {
    if (!window.confirm(`Delete ${name} from this demo?`)) return;

    setClubs((current) => current.filter((c) => c.id !== id));
  }

  return (
    <Panel title="Club Management">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Club</th>
              <th>Category</th>
              <th>Members</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <ClubLogo club={c} />
                    <Link
                      to="/clubs/$clubId"
                      params={{ clubId: c.id }}
                      className="hover:text-primary"
                    >
                      {c.name}
                    </Link>
                  </div>
                </td>

                <td>{c.category}</td>
                <td>{c.members}</td>

                <td>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteClub(c.id, c.name)}
                  >
                    <Trash2 size={13} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

export function EventManagementPanel() {
  const { events, setEvents } = useDemo();

  function deleteEvent(id: string, name: string) {
    if (!window.confirm(`Delete ${name}?`)) return;

    setEvents((current) => current.filter((e) => e.id !== id));
  }

  return (
    <Panel title="Event Management">
      {events.map((e) => (
        <EventRow key={e.id} e={e}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => deleteEvent(e.id, e.name)}
          >
            <Trash2 size={14} />
            Delete
          </Button>
        </EventRow>
      ))}
    </Panel>
  );
}

export function ParticipationReportsPanel() {
  return (
    <Panel title="Participation Reports">
      {participation.map((p) => (
        <div
          key={p.event}
          className="dash-row flex-col !items-stretch"
        >
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold flex items-center gap-2">
              <CalendarDays size={14} />
              {p.event}
            </span>

            <span className="text-muted-foreground">
              {p.registered} / {p.capacity}
            </span>
          </div>

          <Progress
            value={
              p.capacity > 0
                ? (p.registered / p.capacity) * 100
                : 0
            }
          />
        </div>
      ))}
    </Panel>
  );
}
