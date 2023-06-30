import { describe, expect, it, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Portfolio from "./Portfolio"

describe("Portfolio", () => {
    const data = [{ category: "Movie", 
    id: 6,
    isTrending: true,
    rating: "E",
    thumbnail: "./assets/thumbnails/the-great-lands/regular/small.jpg",
    title: "The Great Seas",
    year: 2019}
    ]
    const profile = ["jfidjifherip2384324jgdfkjp", true, [1,4,8], true, false, "admin@admin.com", "Admin", "local"]

    render(<Portfolio filteredData={data} profile={profile}/>)

    test("should display movie title", () => {
        expect(screen.getByText("The Great Seas")).toBeDefined()
    })

})
