// Calendly integration client — stub
// Used for embed widget and scheduling link generation
// Activate by configuring NEXT_PUBLIC_CALENDLY_URL env var

export const calendlyClient = {
  getSchedulingUrl(): string {
    return process.env.NEXT_PUBLIC_CALENDLY_URL ?? '#'
  },
}
