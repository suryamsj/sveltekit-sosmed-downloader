import { API_ENDPOINT } from '$env/static/private';
import { containsTikTokLink } from '$lib/regex';
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
        try {
            const formData = Object.fromEntries(await request.formData());

            const url = formData.url;

            await sleep(2000);

            const checkLink = containsTikTokLink(url.toString());

            const validate = {
                success: false, message: "Link yang anda masukkan, bukan merupakan link dari Tiktok!."
            }

            if (checkLink === false) return fail(422, validate);

            const response = await axios.get(`${API_ENDPOINT}/tiktok?link=${url}`);
            const data = await response.data;

            return { success: true, response: data.respon }
        } catch (error) {
            const failed = {
                error: true, message: "Server Error"
            }
            return fail(500, failed)
        }
    }
};