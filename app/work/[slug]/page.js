import React from 'react'
import UserConfiguration from "../../Config/UserConfiguration.json"

export function generateStaticParams() {
    const works = UserConfiguration.Work
    const slugs = works.map((work) => ({
        slug: work.slug,
    }))

    return slugs
}

async function WorkPage({ params }) {
    const { slug } = await params
    const data = UserConfiguration.Work.find((work) => work.slug === slug)
    return (
        <div>
            <img src={data.banner_img} />
            <div className='p-4 flex flex-col gap-8'>
                {
                    data.data.map((item) => {
                        return (
                            <div key={item.id}>
                                <div className='flex flex-col gap-4'>
                                    <h2 className='font-antonio text-[30px]'>{item.title}</h2>
                                    <p className='font-ubuntu text-[14px] text-[#F0F0F0]'>{item.para}</p>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default WorkPage