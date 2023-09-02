import { API_ENDPOINT } from '$env/static/private';
import { containsFacebookLink } from '$lib/regex';
import { fail } from '@sveltejs/kit';
import axios from 'axios';

/**
 * @param {number} ms
 */
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        const url = formData.url;

        await sleep(2000);

        const checkLink = containsFacebookLink(url.toString());

        const validate = {
            success: false, message: "Link yang anda masukkan, bukan merupakan link dari Facebook!."
        }

        if (checkLink === false) return fail(422, validate);

        const response = await axios.get(`${API_ENDPOINT}/fbdl3?link=${url}`);
        const data = await response.data;

        return { success: true, response: data.hasil }
    }
};