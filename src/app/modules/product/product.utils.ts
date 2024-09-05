export function generateSlug(title: string): string {
    return title.toLowerCase().split(" ").join("-")
  }