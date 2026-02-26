import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import { describe, it, expect, vi } from "vitest";
import type { ReactNode } from "react";

/* ---------------- MOCK REACT ROUTER ---------------- */
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn()
}));

/* ---------------- MOCK TABLE CARD ---------------- */

type OrderMock = {
  id: number;
  table: number;
  status: string;
};

vi.mock("../components/TableCard", () => ({
  default: ({
    order,
    onClick
  }: {
    order: OrderMock;
    onClick: () => void;
  }) => (
    <div data-testid="table-card" onClick={onClick}>
      Mesa {order.table}
    </div>
  )
}));

/* ---------------- MOCK DRAG & DROP ---------------- */

type DndChildrenProps = {
  innerRef: () => void;
  droppableProps?: object;
  draggableProps?: object;
  dragHandleProps?: object;
  placeholder?: ReactNode;
};

vi.mock("@hello-pangea/dnd", () => ({
  DragDropContext: ({
    children
  }: {
    children: ReactNode;
  }) => <div>{children}</div>,

  Droppable: ({
    children
  }: {
    children: (props: DndChildrenProps) => ReactNode;
  }) =>
    children({
      innerRef: () => {},
      droppableProps: {},
      placeholder: null
    }),

  Draggable: ({
    children
  }: {
    children: (props: DndChildrenProps) => ReactNode;
  }) =>
    children({
      innerRef: () => {},
      draggableProps: {},
      dragHandleProps: {}
    })
}));

/* ---------------- TESTS ---------------- */

describe("Dashboard", () => {
  it("renderiza el título principal", () => {
    render(<Dashboard />);
    expect(screen.getByText("Gestión de pedidos")).toBeInTheDocument();
  });

  it("renderiza las 3 columnas", () => {
    render(<Dashboard />);

    expect(screen.getByText("🟡 Pendiente")).toBeInTheDocument();
    expect(screen.getByText("🔵 En preparación")).toBeInTheDocument();
    expect(screen.getByText("🟢 Servido")).toBeInTheDocument();
  });

  it("renderiza pedidos en pantalla", () => {
    render(<Dashboard />);

    const cards = screen.getAllByTestId("table-card");
    expect(cards.length).toBeGreaterThan(0);
  });
});