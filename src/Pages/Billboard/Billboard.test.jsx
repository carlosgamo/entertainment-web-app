import { describe, expect, it, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Billboard from './Billboard'

describe('Billboard', async () => {
    const data = [{ category: "Movie", 
        id: 6,
        isTrending: true,
        rating: "E",
        thumbnail: "./assets/thumbnails/the-great-lands/regular/small.jpg",
        title: "The Great Lands",
        year: 2019}
    ]
    const profile = ["jfidjifherip2384324jgdfkjp", true, [1,4,8], true, false, "admin@admin.com", "Admin", "local"]

    render(<Billboard sectionTitle={"Movies"} data={data} profile={profile}/>)

    test("should display the section title", () => {
        expect(screen.getByText("Movies")).toBeDefined()
    })

    test("should display the movie name", () => {
        expect(screen.getByText("The Great Lands")).toBeDefined()
    })
})