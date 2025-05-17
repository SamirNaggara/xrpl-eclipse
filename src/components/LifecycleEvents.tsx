"use client";

interface LifecycleEvent {
  id: string;
  type: "production" | "repair" | "refurbishment" | "resale" | "recycling";
  date: string;
  description: string;
  location: string;
  operator: string;
  transactionHash: string;
}

const MOCK_EVENTS: LifecycleEvent[] = [
  {
    id: "evt_001",
    type: "production",
    date: "2024-01-15",
    description: "Production initiale",
    location: "Usine de Grenoble, France",
    operator: "SafeOut Manufacturing",
    transactionHash: "0x1234...5678",
  },
  {
    id: "evt_002",
    type: "repair",
    date: "2024-02-20",
    description: "Remplacement batterie",
    location: "Centre de réparation Paris",
    operator: "SafeOut Service",
    transactionHash: "0x8765...4321",
  },
  {
    id: "evt_003",
    type: "refurbishment",
    date: "2024-03-10",
    description: "Reconditionnement complet",
    location: "Centre de reconditionnement Lyon",
    operator: "SafeOut Refurb",
    transactionHash: "0x9876...5432",
  },
];

const EVENT_ICONS = {
  production: "🏭",
  repair: "🔧",
  refurbishment: "♻️",
  resale: "🏪",
  recycling: "♻️",
};

export function LifecycleEvents() {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
      <div className="space-y-8">
        {MOCK_EVENTS.map((event, index) => (
          <div key={event.id} className="relative flex items-start">
            <div
              className={`absolute left-8 w-3 h-3 rounded-full border-2 ${
                index === 0
                  ? "bg-violet-600 border-violet-600"
                  : "bg-white border-gray-300"
              }`}
              style={{ transform: "translateX(-50%)" }}
            />
            <div className="ml-12 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label={event.type}>
                  {EVENT_ICONS[event.type]}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {event.description}
                  </h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Localisation
                  </p>
                  <p className="mt-1 text-sm">{event.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Opérateur</p>
                  <p className="mt-1 text-sm">{event.operator}</p>
                </div>
              </div>
              <div className="mt-3">
                <a
                  href={`https://testnet.xrpl.org/transactions/${event.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-violet-600 hover:text-violet-800"
                >
                  Voir la transaction →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
