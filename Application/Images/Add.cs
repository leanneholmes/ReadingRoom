using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Images
{
    public class Add
    {
        public class Command : IRequest<Result<Image>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Image>>
        {
            private readonly DataContext _context;
            private readonly IImageAccessor _imageAccessor;

            public Handler(DataContext context, IImageAccessor imageAccessor)
            {
                _imageAccessor = imageAccessor;
                _context = context;
            }
            public async Task<Result<Image>> Handle(Command request, CancellationToken cancellationToken)
            {
                var imageUploadResult = await _imageAccessor.AddImage(request.File);

                var image = new Image
                {
                    Url = imageUploadResult.Url,
                    Id = imageUploadResult.PublicId
                };

                if (imageUploadResult != null) return Result<Image>.Success(image);

                return Result<Image>.Failure("Problem adding image");
            }
        }

    }
}