using Application.Interfaces;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Photos
{
    public class ImageAccessor : IImageAccessor
    {
        public Task<PhotoUploadResult> AddImage(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public Task<string> DeleteImage(string publicId)
        {
            throw new NotImplementedException();
        }
    }
}