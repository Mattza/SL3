using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;

namespace SL.Controllers
{
    public class SLController : ApiController
    {
        public object Post([FromBody]SearchObj searchString)
        {
            var str = "";
            foreach (var v in searchString.GetType().GetProperties())
            {
                str += "&" +v.Name+"="+ v.GetValue(searchString, null).ToString();

            }
            var url = @"http://api.sl.se/api2/TravelplannerV2/trip.json?key=6a517447db2c4a72adc256399cef82ad"+str;
            var request = (HttpWebRequest)WebRequest.Create(url);
            var response = (HttpWebResponse)request.GetResponse();
            return JsonConvert.DeserializeObject(new StreamReader(response.GetResponseStream()).ReadToEnd());
            //return new StreamReader(response.GetResponseStream()).ReadToEnd();//.ToJ;//.ToJson();
        }

        public class SearchObj
        {
            public string originId { get; set; }
            public string destId { get; set; }

        }
    }
}