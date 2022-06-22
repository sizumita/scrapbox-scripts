export type layout
    = "list"
    | "page"
    | "stream"
    | `project-settings-${project_setting_pages}-page`
    | `settings-${setting_pages}-page`

type project_setting_pages = "basic" | "billing" | "members"
type setting_pages = "profile" | "extensions" | "delete-account"

