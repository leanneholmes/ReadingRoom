using Application.Profiles;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username })); // Inserted space after Details.Query
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{username}/bookclubs")]
        public async Task<IActionResult> GetUserBookClubs(string username)
        {
            return HandleResult(await Mediator.Send(new ListBookClubs.Query { Username = username })); // Inserted space after ListBookClubs.Query
        }
    }
}