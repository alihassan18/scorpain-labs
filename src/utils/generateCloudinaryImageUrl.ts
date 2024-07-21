export const generateCloudinaryImageUrl = (baseUrl: string, width: number, height: number, quality: number = 100, convertToJpg: boolean = false) : string => {
    let newUrl = baseUrl.replace('/upload', `/upload/c_fill,w_${Math.floor(width)},h_${Math.floor(height)},q_${quality}`);
    
    if(convertToJpg && newUrl.includes('.png')){
        newUrl = newUrl.replace('.png', `.jpg`);
    }

    return newUrl
}
