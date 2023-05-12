import type { Question, Metadata, Author } from ".";

export interface StrapiAttributes {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}


export interface StrapiPagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export interface StrapiList<T> {
    data: {
        id: number,
        attributes: T & StrapiAttributes
    }[],

    meta: {
        pagination: StrapiPagination
    }

}

export interface StrapiItem<T> {
    data: {
        id: number,
        attributes: T & StrapiAttributes
    },

    meta: {}



}




export interface StrapiQuiz extends Metadata {
    questions: Question[]
    author: Author
}


interface StrapizeData<T> {
    data: {
        id: number
    } & T & StrapiAttributes
}



export interface StrapiFeatured {
    quizzes: (StrapiQuiz & {id: number})[]
}

