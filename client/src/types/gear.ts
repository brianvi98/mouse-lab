export type Gear = {
  id: string; // UUID
  brand: string;
  model: string;
  fullName: string;
};

export type GearResponse = {
  data: {
    mice: Gear[];
    mousepads: Gear[];
    skates: Gear[];
  };
  error: string | null;
  path: string;
  timestamp: string; // using Java's Instant
};
