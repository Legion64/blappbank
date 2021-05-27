export default {
    getCurrentPosition() {
        return new Promise(async (resolve, reject) => {
            await navigator.geolocation.getCurrentPosition(
                ({coords}) => resolve(coords),
                (err) => reject(err),
                {
                    enableHighAccuracy: true
                }
            )
        })
    },
}