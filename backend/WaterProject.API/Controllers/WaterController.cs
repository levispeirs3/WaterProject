using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;

        public WaterController(WaterDbContext temp)
        {
            _waterContext = temp;
        }

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1)
        {
            var something =  _waterContext.Projects
                 .Skip((pageNum - 1) * pageSize)
                 .Take(pageSize)
                 .ToList();

            var totalNumProjects = _waterContext.Projects.Count();

            var someObject = new
            {
                TotalNumProjects = totalNumProjects,
                Projects = something
            };

            return Ok(someObject);
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _waterContext.Projects.Where(x => x.ProjectFunctionalityStatus == "Functional").ToList();
            return something;
        }
    }
}
