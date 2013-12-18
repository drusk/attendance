/******************************************************************************
 * Copyright (C) 2013 David Rusk
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *****************************************************************************/

var mongoose = require('mongoose');
var Organization = mongoose.model('Organization');

exports.new = function (req, res) {
    res.render('organizations/new', {
        title: 'New Organization',
        error_msg: null
    });
};

exports.create = function (req, res) {
    var organization = new Organization(req.body);

    organization.save(function (err) {
        if (err) {
            // TODO: proper error handling
            console.log('An error occurred: ' + err);
            return;
        }

        return res.redirect('/organizations/' + organization._id);
    });
};

exports.show = function (req, res) {
    var query = Organization.where({_id: req.params.id});
    query.findOne(function (err, organization) {
        if (err) {
            console.log('Error retrieving organization');
            return;
        }

        if (organization) {
            res.render('organizations/show', {
                name: organization.name
            });
        }
    });
};

exports.list = function (req, res) {
    Organization.find(function (err, organizations) {
       if (err) {
           console.log('An error occurred: ' + err);
           return;
       }

       res.render('organizations/list', {
           title: 'Organizations',
           organizations: organizations
       });
    });
};
