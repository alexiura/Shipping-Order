using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Data;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingOrdersController : ControllerBase
    {
        private readonly Project1Context _context;

        public ShippingOrdersController(Project1Context context)
        {
            _context = context;
        }

        // GET: api/ShippingOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingOrder>>> GetShippingOrder()
        {
            return await _context.ShippingOrder.ToListAsync();
        }

        // GET: api/ShippingOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShippingOrder>> GetShippingOrder(Guid id)
        {
            var shippingOrder = await _context.ShippingOrder.FindAsync(id);

            if (shippingOrder == null)
            {
                return NotFound();
            }

            return shippingOrder;
        }

        // PUT: api/ShippingOrders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShippingOrder(Guid id, ShippingOrder shippingOrder)
        {
            if (id != shippingOrder.Id)
            {
                return BadRequest();
            }

            _context.Entry(shippingOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShippingOrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ShippingOrders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ShippingOrder>> PostShippingOrder(ShippingOrder shippingOrder)
        {
            shippingOrder.Id = Guid.NewGuid();
            _context.ShippingOrder.Add(shippingOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShippingOrder", new { id = shippingOrder.Id }, shippingOrder);
        }

        // DELETE: api/ShippingOrders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShippingOrder(Guid id)
        {
            var shippingOrder = await _context.ShippingOrder.FindAsync(id);
            if (shippingOrder == null)
            {
                return NotFound();
            }

            _context.ShippingOrder.Remove(shippingOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShippingOrderExists(Guid id)
        {
            return _context.ShippingOrder.Any(e => e.Id == id);
        }
    }
}
