using Microsoft.AspNetCore.Mvc;

namespace RobinTTSApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello from .NET Backend!");
        }
    }
}
