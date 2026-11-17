import { fireEvent, render, screen } from "@testing-library/react";
import { DemoJoin } from "@/components/demo-controls";
import { DemoProvider, useDemo } from "@/data/demo-store";

function JoinProbe({ id }: { id: string }) {
  const demo = useDemo();
  const club = demo.clubs.find((item) => item.id === id);
  return (
    <div>
      <button type="button" onClick={() => demo.joinClub(id)}>
        join
      </button>
      <p data-testid="joined">{demo.joined.join(",")}</p>
      <p data-testid="members">{club?.members}</p>
    </div>
  );
}

function RegisterProbe({ id }: { id: string }) {
  const demo = useDemo();
  return (
    <div>
      <button type="button" onClick={() => demo.registerEvent(id)}>
        register
      </button>
      <p data-testid="registered">{demo.registered.join(",")}</p>
    </div>
  );
}

describe("demo club and event membership", () => {
  it("joins a club once and increases its member count", () => {
    render(
      <DemoProvider>
        <JoinProbe id="impact" />
      </DemoProvider>,
    );

    expect(screen.getByTestId("members")).toHaveTextContent("156");
    fireEvent.click(screen.getByRole("button", { name: "join" }));
    expect(screen.getByTestId("joined")).toHaveTextContent("aces,ieee,cloud-aws,impact");
    expect(screen.getByTestId("members")).toHaveTextContent("157");

    fireEvent.click(screen.getByRole("button", { name: "join" }));
    expect(screen.getByTestId("joined").textContent?.split(",").filter((id) => id === "impact")).toHaveLength(1);
    expect(screen.getByTestId("members")).toHaveTextContent("157");
  });

  it("does not register the same event twice", () => {
    render(
      <DemoProvider>
        <RegisterProbe id="tech-fest" />
      </DemoProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "register" }));
    expect(screen.getByTestId("registered")).toHaveTextContent("tech-fest,rhythm-night");
    expect(screen.getByTestId("registered").textContent?.split(",")).toHaveLength(2);
  });

  it("registers a new event and shows a confirmation", () => {
    render(
      <DemoProvider>
        <DemoJoin id="art-workshop" event />
      </DemoProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Register for Event" }));
    expect(screen.getByRole("status")).toHaveTextContent("Registered for this event. This demo list resets when the page is refreshed.");
    expect(screen.getByRole("button", { name: "Registered · Demo" })).toBeDisabled();
  });

  it("blocks a second club join from the button", () => {
    render(
      <DemoProvider>
        <DemoJoin id="aces" />
      </DemoProvider>,
    );

    const button = screen.getByRole("button", { name: "Joined · Demo" });
    expect(button).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Already joined in this demo. Resets after refresh.");
    fireEvent.click(button);
  });
});
