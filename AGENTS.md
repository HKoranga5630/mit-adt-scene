<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep shared navigation and footer in the root layout, with a separate content route for each page, so all screens have consistent navigation and metadata.
- Keep sample club and event records in a typed, browser-safe data module, separate from presentation, so a future data service can replace them.
- Keep authentication screens presentational with disabled submission until a real authentication provider is connected; never simulate sessions or persistence.
